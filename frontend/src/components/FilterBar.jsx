const FilterBar = ({ filter, setFilter }) => {
  return (
    <div className="w-4/5 max-w-[800px] h-14 mt-6 px-20 flex justify-between rounded-lg bg-Very-Light-Gray dark:bg-dark-cardBg z-50 shadow-xl text-Dark-Grayish-Blue dark:text-dark-filter font-bold md:hidden">
      <button
        className={
          filter === "all"
            ? "text-Bright-Blue"
            : "hover:text-Very-Dark-Grayish-Blue dark:hover:text-dark-filterHover"
        }
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={
          filter === "active"
            ? "text-Bright-Blue"
            : "hover:text-Very-Dark-Grayish-Blue dark:hover:text-dark-filterHover"
        }
        onClick={() => setFilter("active")}
      >
        Active
      </button>
      <button
        className={
          filter === "completed"
            ? "text-Bright-Blue"
            : "hover:text-Very-Dark-Grayish-Blue dark:hover:text-dark-filterHover"
        }
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterBar;
