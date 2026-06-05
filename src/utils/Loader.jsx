import { useEffect } from "react";

const loaderStyles = `
  .loader {
    position: relative;
    width: 2.5em;
    height: 2.5em;
    transform: rotate(165deg);
  }
  .loader::before,
  .loader::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 0.5em;
    height: 0.5em;
    border-radius: 0.25em;
    transform: translate(-50%, -50%);
  }
  .loader::before {
    animation: before8 2s infinite;
  }
  .loader::after {
    animation: after6 2s infinite;
  }
  @keyframes before8 {
    0%   { width: 0.5em; box-shadow:  1em -0.5em rgba(225,20,98,.75), -1em  0.5em rgba(111,202,220,.75); }
    35%  { width: 2.5em; box-shadow:    0 -0.5em rgba(225,20,98,.75),    0  0.5em rgba(111,202,220,.75); }
    70%  { width: 0.5em; box-shadow: -1em -0.5em rgba(225,20,98,.75),  1em  0.5em rgba(111,202,220,.75); }
    100% {               box-shadow:  1em -0.5em rgba(225,20,98,.75), -1em  0.5em rgba(111,202,220,.75); }
  }
  @keyframes after6 {
    0%   { height: 0.5em; box-shadow:  0.5em  1em rgba(61,184,143,.75), -0.5em -1em rgba(233,169,32,.75); }
    35%  { height: 2.5em; box-shadow:  0.5em    0 rgba(61,184,143,.75), -0.5em    0 rgba(233,169,32,.75); }
    70%  { height: 0.5em; box-shadow:  0.5em -1em rgba(61,184,143,.75), -0.5em  1em rgba(233,169,32,.75); }
    100% {                box-shadow:  0.5em  1em rgba(61,184,143,.75), -0.5em -1em rgba(233,169,32,.75); }
  }
`;

export default function Loader({ className = "min-h-screen bg-white" }) {
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = loaderStyles;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  return (
    <div className={`flex items-center justify-center w-full h-full ${className}`}>
      <div className="loader" />
    </div>
  );
}