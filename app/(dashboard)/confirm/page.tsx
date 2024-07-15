export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const success = searchParams.success;
  if (success !== "true") {
    return (
      <div className="grid place-content-center py-24 text-2xl">
        Qualcosa è andato storto, riprova.
      </div>
    );
  }
  return (
    <div className="grid place-content-center py-24 text-2xl">
      Grazie, avrai presto nostre notizie sulla tue email.
    </div>
  );
}
