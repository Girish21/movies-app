type SpaceBetweenType = {
  direction?: "vertical" | "horizontal";
  size?: string | number;
};

export default function SpaceBetween({
  direction = "horizontal",
  size = 1,
}: SpaceBetweenType) {
  let width: string | number;
  let height: string | number;

  if (direction === "horizontal") {
    width = size;
    height = 1;
  } else {
    width = 1;
    height = size;
  }

  return <span style={{ display: "inline-block", width, height }} />;
}
