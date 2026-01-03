export default function FeatureCardDocs({ id, title, items = [], highlight = false }) {
  return (
    <article
      id={id}
      className={`bg-white rounded-lg p-6 border border-black/10 shadow-sm transition-transform transition-shadow duration-300 ease-out hover:bg-white hover:backdrop-blur-sm hover:shadow-2xl hover:scale-105 hover:border-black/20 ${
        highlight ? "ring-4 ring-black/10 scale-105" : ""
      }`}
      style={{ willChange: 'transform, box-shadow' }}
    >
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <div className="mb-2 text-gray-700">
        <ul className="list-disc list-inside space-y-1">
          {items.map((it, idx) => (
            <li key={idx}>{it}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
