import {Link, useParams} from "react-router";
import {useEffect} from "react";
import {ArrowLeft} from "lucide-react";
import type {State} from "@epfl-si/react-appauth";

export const BarcodeDetailPage = ({ oidc }: { oidc: State }) => {
  const { barcode } = useParams();

  console.log("Voici le codebarre dans l'url", barcode)
  useEffect(() => {
    console.log("Fetch info for :", barcode);
  }, [barcode]);

  return (
    <div className="p-8 max-w-4xl mx-auto">
    <Link
      to={`/`}
      className="mb-6"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
                                              Retour aux storages
    </Link>
      <h1 className="text-3xl font-bold mb-4">Détails du Code-barre {barcode}</h1>
    </div>
  );
};
