import batteryIcon from '../images/battery.svg';
import rangeIcon from '../images/range.svg';
import emissionIcon from '../images/emission.svg';

export function BestSellerCard({ image, title, description, features }) {
  // Map icon keys to imported SVGs
  const iconMap = {
    battery: batteryIcon,
    range: rangeIcon,
    emission: emissionIcon,
  };
  return (
    <div className="shadow-lg overflow-hidden flex flex-col items-center w-full" style={{ minHeight: 600, background: '#252525' }}>
      <img src={image} alt={title} className="w-full object-cover mb-6" style={{ height: 520, maxHeight: 520 }} />
      <h3 className="text-xl font-bold text-white mb-2 text-left w-full px-8">{title}</h3>
      <p className="text-gray-300 text-base mb-8 text-left w-full px-8">{description}</p>
      <div className="flex w-full flex-wrap justify-center gap-4 sm:gap-6 mt-2 px-8 sm:justify-center pb-4 overflow-x-auto">
        {features.map((f, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10">
              <img
                src={iconMap[f.icon]}
                alt={f.label + ' icon'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  marginTop: f.icon === 'battery' ? 2 : 0,
                  marginBottom: f.icon === 'battery' ? 2 : 0,
                  transform: f.icon === 'battery' ? 'scale(1.15)' : 'none',
                }}
                className="w-7 h-7 sm:w-8 sm:h-8"
              />
            </span>
            <span className="text-gray-200 font-semibold text-xs sm:text-sm">{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
