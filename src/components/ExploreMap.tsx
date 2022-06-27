import { Map, Marker, useMap } from "react-mapkit";
import { Park } from "../../typing";

function ExploreMap({ coords }: { coords: Park["coords"] }) {
  const { mapProps, map } = useMap({
    center: [coords.latitude, coords.longitude],
  });
  const deviceHeight = window.innerHeight;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  if (typeof map !== "undefined") {
    map.cameraDistance = 10000;
    map.cameraZoomRange = new mapkit.CameraZoomRange(200, 100000);
    map.colorScheme = prefersDark.matches
      ? mapkit.Map.ColorSchemes.Dark
      : mapkit.Map.ColorSchemes.Light;
    map.padding = new mapkit.Padding({ bottom: deviceHeight / 4 });
  }
  return (
    // @ts-ignore
    <Map {...mapProps}>
      {coords && (
        <Marker latitude={coords.latitude} longitude={coords.longitude} />
      )}
    </Map>
  );
}
export default ExploreMap;
