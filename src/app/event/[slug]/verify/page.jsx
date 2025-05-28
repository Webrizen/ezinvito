import CheckInPage from "@/components/system/check-in";

export default async function page({ params, searchParams }) {

  // Properly access params and searchParams
  const { slug } = await params;
  const { rsvpId } = await searchParams;

  if (!rsvpId || !slug) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <CheckInPage slug={slug} rsvpId={rsvpId} />
  );
}