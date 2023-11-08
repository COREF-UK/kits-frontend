/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true
  },
  reactStrictMode: true,
  //   /**
  //  * Enable static exports for the App Router.
  //  *
  //  * @see https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
  //  */
  //   output: "export",

    /**
     * Set base path. This is usually the slug of your repository.
     *
     * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
     */
    basePath: "",
  
    /**
     * Disable server-based image optimization. Next.js does not support
     * dynamic features with static exports.
     *
     * @see https://nextjs.org/docs/pages/api-reference/components/image#unoptimized
     */
  images: {
    loader: "default",
    domains: ["kits-strapi.thalescoref.co.uk"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "kits-strapi.thalescoref.co.uk",
        port: "80",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
