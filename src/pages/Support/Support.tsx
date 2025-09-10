import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function Support() {
  return (
    <>
      <PageMeta
        title="Support"
        description="This is the Support page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Support" />

      <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phone Support */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
            Need Help?
          </h3>
          <p className="text-gray-600 dark:text-white/70 mb-6">
            Our support team is here to help you with technical issues.
          </p>

          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <i className="pi pi-phone text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-white/60">
                Support Number
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                +91 99099 29293
              </p>
            </div>
          </div>
        </div>

        {/* <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
            Need Help?
          </h3>
          <p className="text-gray-600 dark:text-white/70 mb-6">
            Our support team is here to help you with billing issues.
          </p>

          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <i className="pi pi-phone text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-white/60">
                Support Number
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                +91 99099 29293
              </p>
            </div>
          </div>
        </div> */}
        {/* Email Support */}
        <div className="">
          {/* <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
            Need Help?
          </h3>
          <p className="text-gray-600 dark:text-white/70 mb-6">
            Our support team is here to help you with technical issues.
          </p>

          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <i className="pi pi-phone text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-white/60">
                Support Number
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                +91 99099 29293
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
