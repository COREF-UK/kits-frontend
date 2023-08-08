interface IButtonProps {
  title: string;
}

export default function Button(props: IButtonProps) {
  return (
    <button
      className="font-bold backdrop-blur-sm px-10 py-2 rounded-xl bg-[#ffffff0d] bg-opacity-40 border border-[#ffffff66]"
      type="button"
    >
      {props.title}
    </button>
  );
}
