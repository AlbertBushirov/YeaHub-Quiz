import "./pagination.scss";

type PropsCatalogPagination = {
  page: number;
  total: number;
  onChange: (arg: number | string) => void;
};

export function CatalogPagination({
  page,
  total,
  onChange,
}: PropsCatalogPagination) {
  const getPagination = (total: number) => {
    const pages = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }

    for (let i = 1; i <= 6; i++) {
      pages.push(i);
    }

    pages.push("...");
    pages.push(total);

    return pages;
  };

  const paginationItems = getPagination(total);
  const last = paginationItems[paginationItems.length - 1];

  return (
    <nav className="pagination" aria-label="Пагинация по каталогу">
      <button
        className="arrow_left"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Перейти на предыдущую страницу"
      ></button>

      <div className="pagination__numbers">
        {paginationItems.map((item, index) => {
          if (item === "...") {
            return (
              <span
                key={`dots-${index}`}
                className="pagination__dots"
                aria-hidden="true"
              >
                ...
              </span>
            );
          }

          const isCurrent = item === page;

          return (
            <button
              key={item}
              className={isCurrent ? "active" : ""}
              onClick={() => onChange(item as number)}
              aria-label={`Перейти на страницу ${item}`}
              aria-current={isCurrent ? "page" : undefined}
            >
              {item}
            </button>
          );
        })}
      </div>

      <button
        className="arrow_right"
        disabled={page === last}
        onClick={() => onChange(page + 1)}
        aria-label="Перейти на следующую страницу"
      ></button>
    </nav>
  );
}
