export function Text({ text, input, state }) {
  const isSame = (v1, v2) => {
    if (state === "now" && !v2) return true;
    return v1 === v2;
  };

  return (
    <p>
      {text
        .split("")
        .map((v, i) =>
          isSame(v, input[i]) ? v : <span key={`diff-${i}`}>{v}</span>
        )}
    </p>
  );
}
