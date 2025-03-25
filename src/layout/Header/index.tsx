import s from "./index.module.scss";

export const Header: React.FC = () => {
  return (
    <div className={"containerHeaderFooter"}>
      <div className={s.header}>
        <h1 className={s.header__title}>Header</h1>
      </div>
    </div>
  );
};
