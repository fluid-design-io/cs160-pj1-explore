import { MdWbCloudy, MdWbSunny } from "react-icons/md";
import { Park } from "../../typing";
import {
  BsCloudRainFill,
  BsCloudSnowFill,
  BsFillCloudSunFill,
} from "react-icons/bs";
import { HTMLAttributes } from "react";
import clsxm from "../lib/clsxm";

function ParkWeatherBar({
  weather,
  ...props
}: { weather: Park["weather"] } & HTMLAttributes<HTMLDivElement>) {
  const weatherIcons = [
    {
      cast: "sunny",
      icon: <MdWbSunny className="w-5 h-5 my-1.5 text-[#e6d115]" />,
    },
    {
      cast: "partly-cloudy",
      icon: (
        <BsFillCloudSunFill className="w-5 h-5 my-1.5 text-medium-default" />
      ),
    },
    {
      cast: "cloudy",
      icon: <MdWbCloudy className="w-5 h-5 my-1.5 text-medium-default" />,
    },
    {
      cast: "rainy",
      icon: <BsCloudRainFill className="w-5 h-5 my-1.5 text-medium-default" />,
    },
    {
      cast: "snowy",
      icon: <BsCloudSnowFill className="w-5 h-5 my-1.5 text-medium-default" />,
    },
  ];
  return (
    <div
      className={clsxm(
        "flex overflow-x-auto max-w-full py-4",
        props?.className
      )}
    >
      {weather.map((cast,i) => {
        const icon =
          weatherIcons.find((i) => i.cast === cast.cast)?.icon || null;
        return (
          <div
            key={`${cast.cast}-${cast.temperature}-${cast.hour}-${i}`}
            className="flex items-center flex-col font-rounded px-3 justify-center"
          >
            <span className="text-xs text-medium-shade">{cast.hour}</span>
            {icon}
            <p className="font-semibold text-dark-tint text-sm">
              {cast.temperature}&#730;
            </p>
          </div>
        );
      })}
    </div>
  );
}
export default ParkWeatherBar;
