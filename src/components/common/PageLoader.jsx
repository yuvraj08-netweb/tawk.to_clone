const PageLoader = () => {
  return (
    <div className="bg-[#121212]">
      <div className="background-loader">
        <div className="loader">
          <span className="spinner spinner1" />
          <span className="spinner spinner2" />
          <span className="spinner spinner3" />
          <br />
          <span className="loader-text">LOADING...</span>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
