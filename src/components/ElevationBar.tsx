// ElevationBar consists of 30 rounded rectangles, each with a width of 10px.
// The height of each rectangle is proportional to the elevation.
// The elevation of each rectangle is determined by the elevation of the park.
function ElevationBar({ elevation }: { elevation: number[] }) {
  return (
    <div className="flex gap-1 items-end justify-between p-4 overflow-x-auto">
      {elevation.map((e, i) => (
        <div
          key={i}
          className="rounded-full w-1.5 bg-primary-default"
          style={{
            height: `${e*1.5}px`,
          }}
        />
      ))}
    </div>
  );
}
export default ElevationBar;
