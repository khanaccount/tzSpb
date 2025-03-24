import s from "./index.module.scss";

export const Footer: React.FC = () => {
  return (
    <div className={"containerHeaderFooter"}>
      <div className={s.footer}>
        <h1 className={s.footer__title}>Footer</h1>
      </div>
    </div>
  );
};
