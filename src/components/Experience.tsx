import { experience, type Experience as Company, type Role } from "../data/profile";
import { useLang } from "../i18n/languageContext";
import SectionTitle from "./SectionTitle";

function toMonths(ym: string): number {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
}

function nowMonths(): number {
  const d = new Date();
  return d.getFullYear() * 12 + d.getMonth();
}

function spanMonths(start: string, end: string | null): number {
  return (end ? toMonths(end) : nowMonths()) - toMonths(start) + 1;
}

export default function Experience() {
  const { t, lang } = useLang();
  const e = t.experience;

  const monthFmt = new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-US", {
    month: "short",
    year: "numeric",
  });
  const formatYM = (ym: string) => {
    const [y, m] = ym.split("-").map(Number);
    return monthFmt.format(new Date(y, m - 1));
  };
  const duration = (months: number) => e.duration(Math.floor(months / 12), months % 12);

  const period = (r: Role) =>
    `${formatYM(r.start)} – ${r.end ? formatYM(r.end) : e.present} · ${duration(spanMonths(r.start, r.end))}`;

  const companyMonths = (c: Company) => {
    const start = Math.min(...c.roles.map((r) => toMonths(r.start)));
    const end = Math.max(...c.roles.map((r) => (r.end ? toMonths(r.end) : nowMonths())));
    return end - start + 1;
  };

  const meta = "font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ash";

  const companyName = (c: Company) =>
    c.url ? (
      <a href={c.url} target="_blank" rel="noreferrer" className="transition-colors hover:text-brass">
        {c.company}
      </a>
    ) : (
      c.company
    );

  const roleBody = (r: Role) => (
    <>
      {r.description[lang].length > 0 && (
        <ul className="m-0 mt-4 max-w-2xl list-none space-y-2 p-0">
          {r.description[lang].map((d) => (
            <li key={d} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ash">
              <span className="mt-[0.7em] h-px w-3 shrink-0 bg-brass" aria-hidden />
              {d}
            </li>
          ))}
        </ul>
      )}
      {r.skills && r.skills.length > 0 && (
        <p className="m-0 mt-4 text-[0.8125rem] leading-relaxed text-ash">
          <span className="text-bone">{e.skills}:</span> {r.skills.join(" · ")}
        </p>
      )}
    </>
  );

  return (
    <section id="pengalaman" className="mx-auto max-w-5xl scroll-mt-28 px-6 py-24 md:scroll-mt-20">
      <SectionTitle kicker={e.kicker} title={e.title} />

      <div>
        {experience.map((c) => {
          const single = c.roles.length === 1 ? c.roles[0] : null;

          return (
            <article
              key={c.company}
              className="flex gap-5 border-b border-rule py-8 first:pt-0 last:border-b-0 sm:gap-6"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden border border-rule bg-panel">
                {c.logo ? (
                  <img src={c.logo} alt="" className="h-full w-full object-contain p-1.5" />
                ) : (
                  <span className="font-mono text-[0.6875rem] font-medium tracking-wider text-brass">
                    {c.short ?? c.company.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                {single ? (
                  <>
                    <h3 className="heading m-0 text-lg text-bone">{single.title}</h3>
                    <p className="m-0 mt-1 text-[0.9375rem] text-bone">
                      {companyName(c)}
                      <span className="text-ash"> · {e.types[single.type]}</span>
                    </p>
                    <p className={`m-0 mt-2 ${meta}`}>{period(single)}</p>
                    {(c.location || single.workplace) && (
                      <p className={`m-0 mt-1 ${meta}`}>
                        {[c.location, single.workplace && e.workplace[single.workplace]]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}
                    {roleBody(single)}
                  </>
                ) : (
                  <>
                    <h3 className="heading m-0 text-lg text-bone">{companyName(c)}</h3>
                    <p className={`m-0 mt-2 ${meta}`}>{duration(companyMonths(c))}</p>
                    {c.location && <p className={`m-0 mt-1 ${meta}`}>{c.location}</p>}

                    <ol className="m-0 mt-6 list-none border-l border-rule p-0">
                      {c.roles.map((r) => (
                        <li key={`${r.title}-${r.start}`} className="relative pb-7 pl-6 last:pb-0">
                          <span
                            className="absolute -left-[4px] top-[0.55rem] h-[7px] w-[7px] bg-brass"
                            aria-hidden
                          />
                          <h4 className="heading m-0 text-base text-bone">{r.title}</h4>
                          <p className="m-0 mt-1 text-[0.875rem] text-ash">{e.types[r.type]}</p>
                          <p className={`m-0 mt-2 ${meta}`}>{period(r)}</p>
                          {r.workplace && (
                            <p className={`m-0 mt-1 ${meta}`}>{e.workplace[r.workplace]}</p>
                          )}
                          {roleBody(r)}
                        </li>
                      ))}
                    </ol>
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
