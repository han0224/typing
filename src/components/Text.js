export function Text({ text, input, state }) {
  const isSame = (char, i) => {
    if (state === "now" && (!input[i] || input.length - 1 === i)) return true;
    return char === input[i];
  };

  return (
    <p>
      {text
        .split("")
        .map((v, i) => (isSame(v, i) ? v : <span key={`diff-${i}`}>{v}</span>))}
    </p>
  );
}
