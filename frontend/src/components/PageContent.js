import classes from './PageContent.module.css';

// destructuring the props right in the parameter
function PageContent({ title, children }) {
  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;
