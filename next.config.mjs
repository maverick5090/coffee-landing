/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isGithubPages = process.env.GITHUB_PAGES === 'true';
const repoName = 'coffee-landing';
const basePath = isProd && isGithubPages ? `/${repoName}` : '';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  }
};

export default nextConfig;
