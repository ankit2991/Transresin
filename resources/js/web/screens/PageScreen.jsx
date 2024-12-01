import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiExecute from "../../api";
import Spinner from "../components/Spinner";

const PageScreen = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!slug) return;

    async function fetchPageDetail() {
      setLoading(true);
      let apiResponse = await ApiExecute(`web/page/${slug}`);
      setLoading(false);

      setPage(apiResponse.data);
    }

    fetchPageDetail();
  }, [slug]);

  if (loading) return <Spinner />;

  return (
    <div className="bg-blue-50">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">{page?.title}</h1>
        </div>
      </section>
      <div className="container mx-auto py-16">
        {page?.image && (
          <div className="mb-5">
            <img src={page.image} alt={page.title} className="rounded-lg" />
          </div>
        )}

        <div
          className="editor-content text-primary-300"
          dangerouslySetInnerHTML={{ __html: page?.description }}
        ></div>
      </div>
    </div>
  );
};

export default PageScreen;
