/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    /**
   * Enable static exports for the App Router.
   *
   * @see https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
   */
    output: "export",

    /**
     * Set base path. This is usually the slug of your repository.
     *
     * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
     */
    basePath: "/",
  
    /**
     * Disable server-based image optimization. Next.js does not support
     * dynamic features with static exports.
     *
     * @see https://nextjs.org/docs/pages/api-reference/components/image#unoptimized
     */
    images: {
      unoptimized: true,
    },
  // images: {
  //   loader: "default",
  //   domains: ["localhost"],
  //   remotePatterns: [
  //     {
  //       protocol: "http",
  //       hostname: "127.0.0.1",
  //       port: "1337",
  //       pathname: "/uploads/**",
  //     },
  //   ],
  // },
};

module.exports = nextConfig;
