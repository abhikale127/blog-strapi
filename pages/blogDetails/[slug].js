import React from "react";
import Layout from "../../components/layout/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

export async function getServerSideProps(context) {
  const { slug } = context.query;
  console.log(slug);
  try {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer 3e6fce4f34c4fff7a81f239ef287b2489faff60413f555ece563524e6b58de423bfb578960ea8485c561a9c8b65e51b66a90c33da066be5183b86b278e9b33aba777b6b51d4c350dffd7c42d5c1ccccef186435a61aca59c103269c9cd4153b9878abf8660fc3f1b0dbc243fdb2732104be82fbe17157b40e8df79ed0b14d99c"
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:1337/api/Blogs?filters[slug][$eq]=${slug}&populate=*`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Parse the response as JSON
    console.log(data);

    return { props: { data } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { data: null } }; // Handle errors gracefully
  }
}

const BlogSingle = ({ data }) => {
  console.log(data);
  //   React.useEffect(() => {
  //     let config = {
  //       method: "get",
  //       maxBodyLength: Infinity,
  //       url: `http://localhost:1337/api/Blogs?filters[slug][$eq]=${slug}`,
  //       headers: {
  //         Authorization:
  //           "Bearer 3e6fce4f34c4fff7a81f239ef287b2489faff60413f555ece563524e6b58de423bfb578960ea8485c561a9c8b65e51b66a90c33da066be5183b86b278e9b33aba777b6b51d4c350dffd7c42d5c1ccccef186435a61aca59c103269c9cd4153b9878abf8660fc3f1b0dbc243fdb2732104be82fbe17157b40e8df79ed0b14d99c",
  //       },
  //     };

  //     axios
  //       .request(config)
  //       .then((response) => {
  //         console.log(JSON.stringify(response.data), "single blog");
  //         setblogDetails(response.data.data[0]);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, []);
  return (
    <>
      <Layout>
        <section className="pb-20">
          <div
            className="pt-20 pb-8 mb-12 bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url('http://localhost:1337${data.data[0].attributes.thumbnail.data[0].attributes.url}')`,
            }}
          >
            <div className="container">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-6">
                  <span className="text-base md:text-lg">
                    <Link href="/blog" legacyBehavior>
                      <a className="text-blueGray-200 hover:underline">
                        <span className="inline-block py-1 px-3 text-xs font-semibold bg-blue-100 text-blue-600 rounded-xl mr-3">
                          Bussiness
                        </span>
                      </a>
                    </Link>
                    <span className="text-blueGray-200 text-sm">
                      {/* {blogDetails?.attributes?.date} */}
                    </span>
                  </span>
                  <h2 className="text-4xl md:text-5xl mt-4 text-white font-bold font-heading">
                    {data.data[0].attributes.title}
                  </h2>
                </div>
                <div className="flex justify-center mb-8">
                  <img
                    className="w-12 h-12 object-cover rounded-full"
                    src="/assets/imgs/placeholders/avatar-8.png"
                    alt="Monst"
                  />
                  <div className="pl-4">
                    <p className="text-blueGray-100 mb-1">Alice Bradley</p>
                    <p className="text-xs text-blueGray-200 font-semibold">
                      Co Founders
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div
              className="max-w-2xl mx-auto"
              dangerouslySetInnerHTML={{
                __html: data.data[0].attributes.content,
              }}
            />
          </div>
        </section>

        <section className="py-20 bg-blue-500">
          <div className="container">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="mb-4 text-3xl lg:text-3xl text-white font-bold font-heading">
                <span>Subscribe now to </span>
                <span className="text-blue-200">Our Newsletter</span> <br />
                <span>and get the Coupon code.</span>
              </h2>
              <p className="mb-8 text-blueGray-200">
                All your information is completely confidential
              </p>
              <div className="flex flex-wrap max-w-lg mx-auto">
                <div className="flex w-full md:w-2/3 px-3 mb-3 md:mb-0 md:mr-6 bg-blue-500 border border-blue-300 rounded">
                  <svg
                    className="h-6 w-6 my-auto text-blue-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  <input
                    className="w-full pl-3 py-4 text-xs text-white placeholder-white font-semibold leading-none bg-blue-500 outline-none"
                    type="text"
                    placeholder="Type your e-mail"
                  />
                </div>
                <button
                  className="w-full md:w-auto py-4 px-8 text-xs text-white text-blue-800 hover:text-white font-semibold leading-none border border-blue-300 hover:border-blue-300 bg-white hover:bg-blue-500 rounded transition duration-300 ease-in-out"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default BlogSingle;
