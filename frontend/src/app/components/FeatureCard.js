export default function FeatureCard({ title, subtitle, icon_src }) {
  return (
    <div className={`w-full h-full flex flex-col justify-between bg-black text-white rounded-md p-5 gap-4 min-h-[260px]`}>
      <div className={`self-end h-20 flex items-start`}>
        <img src={icon_src} className="h-16 w-16 object-contain" />
      </div>
      <div>
        <h3 className={`text-2xl font-bold`}>{title}</h3>
        <h4 className={`text-sm font-light`}>{subtitle}</h4>
      </div>
    </div>
  );
}
