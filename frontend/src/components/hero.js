function HeroSection() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Business Directory
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
          Let's help you locate a business of your choice
        </p>

        <div>
          {/* <div className="mt-8 flex flex-wrap items-center justify-center text-gray-500 sm:justify-between"> */}
          {/* <FormComponent/> */}
          {/* </div> */}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
