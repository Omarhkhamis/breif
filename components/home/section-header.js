export default function SectionHeader({ eyebrow, title, copy }) {
  return (
    <div className="max-w-3xl space-y-5">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      <p className="section-copy">{copy}</p>
    </div>
  );
}
