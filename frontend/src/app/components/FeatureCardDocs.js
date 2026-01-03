export default function FeatureCardDocs({ id, title, items = [] }) {
  return (
    <article id={id} className="bg-transparent rounded-lg p-6 border-2 border-black/10 shadow-sm transition-all duration-300 ease-out hover:bg-white/20 hover:backdrop-blur-md hover:shadow-lg hover:border-[1px] hover:border-black/30">
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
