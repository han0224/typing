export function Text({ text, input, state }) {
  const isSame = (v1, i) => {
    if (state === "now" && (!input[i] || input.length - 1 === i)) return true;
    return v1 === input[i];
  };

  return (
    <p>
      {text
        .split("")
        .map((v, i) => (isSame(v, i) ? v : <span key={`diff-${i}`}>{v}</span>))}
    </p>
  );
}
