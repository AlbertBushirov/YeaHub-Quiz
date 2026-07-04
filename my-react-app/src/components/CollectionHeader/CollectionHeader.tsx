interface CollectionHeaderProps {
  imageSrc?: string;
  title: string;
  description?: string;
}

export function CollectionHeader({
  imageSrc,
  title,
  description,
}: CollectionHeaderProps) {
  return (
    <div className="detail_collection__header">
      <div className="collection_container__image">
        <img src={imageSrc} alt={title} />
      </div>
      <div className="detail_collection__title_conteiner">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}
