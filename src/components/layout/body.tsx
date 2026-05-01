import { useEffect, useState } from "react";
import { fetchStorage } from "@/lib/graphql/fetchingTools";
import { StorageTable } from "@/components/StorageTable";

export const Body = ({ oidc }: { oidc: any }) => {
  const [storages, setStorages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadStorages = async () => {
    setIsLoading(true);
    const response = await fetchStorage(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken
    );
    if (response.status === 200 && response.data) {
      setStorages(response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadStorages();
  }, [oidc.accessToken]); // Recharge si le token change

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Gestion des lieux de Stockage</h1>
          <p className="text-gray-500 text-sm mt-1">Gérez vos emplacements.</p>
        </div>
      </div>

      <StorageTable storages={storages} isLoading={isLoading} />
    </div>
  );
}
