export default function FeatureCard({ title, subtitle, icon_src }) {
  return (
    <div
      className={`
				flex flex-1 flex-col 
			bg-black text-white 
				rounded-md p-5 gap-10
				w-[90vw] md:w-[40vw] lg:w-[20vw]
			`}
    >
      <div className={`self-end`}>
        <img src={icon_src} height={70} width={70}></img>
      </div>
      <div>
        <h3 className={`text-2xl font-bold`}>{title}</h3>
        <h4 className={`text-sm font-light`}>{subtitle}</h4>
      </div>
    </div>
  );
}
