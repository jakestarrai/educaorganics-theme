import { h } from 'preact';

export const Loader = () => {
  return (
    <div
      className="
        spinner-holder
        overflow-hidden
        pb-6
        pt-9
      "
    >
      <div
        className="
          spinner
          m-auto
          h-8
          w-8
          animate-spin
          rounded-full
          border-3
          border-[#dadada]
          border-t-[#333]
          md:h-11
          md:w-11
        "
      />
    </div>
  );
};
