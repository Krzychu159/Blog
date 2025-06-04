import "./Story.scss";

export default function Story() {
  return (
    <div className="story">
      <div className="plus">+</div>
      <div className="text">
        <p style={{ fontSize: "1.2em" }}>Create Story</p>
        <p style={{ fontSize: "0.9em", color: "darkgray" }}>
          Share a photo or write something.
        </p>
      </div>
    </div>
  );
}
