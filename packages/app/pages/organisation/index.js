import {useState} from "react";
import Link from "next/link";

import Button from "../../components/button.jsx";
import Dialog from "../../components/dialog.jsx";
import DialogTitle from "../../components/dialog-title.jsx";
import ErrorPanel from "../../components/error-panel.jsx";
import LoadingPanel from "../../components/loading-panel.jsx";
import MainFull from "../../components/main-full.jsx";
import OrganisationEdit from "../../components/organisation-edit.jsx";
import PageHeading from "../../components/page-heading.jsx";

import {useSubscribeOrganisations} from "../../data/organisation.js";

export default function Organisations() {
  const {data, error, loading} = useSubscribeOrganisations();
  const [addOrganisation, setAddOrganisation] = useState(false);

  const handleAddOrganisationToggle = () => {
    setAddOrganisation(!addOrganisation);
  };

  return (
    <MainFull>
      {loading && <LoadingPanel>Loading...</LoadingPanel>}
      {error && <ErrorPanel>{error.message}</ErrorPanel>}
      {data && (
        <>
          <PageHeading heading="Organisations" />
          <div className="flex flex-col w-full space-y-2">
            {data.length > 0 &&
              data.map((organisation) => {
                return (
                  <Link key={organisation.id} href="#">
                    <div className="flex flex-col  hover:bg-primary hover:text-base-inverted border-b-2 text-base mb-1 p-2 cursor-pointer">
                      <div>
                        <span className="font-bold">
                          {organisation.name} / {organisation.domain}
                        </span>
                      </div>
                      <div>
                        <span>{organisation.description || "n/a"}</span>
                      </div>
                      <div className="flex flex-row items-center space-x-2">
                        <i className="fad fa-id-badge text-primary-dark" />
                        <span className="text-sm font-mono">{organisation.id}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            {data.length === 0 && <span className="p-2">No organisations found.</span>}
          </div>
        </>
      )}
      <div className="flex flex-row justify-end mt-2">
        <Button type="button" onClick={handleAddOrganisationToggle}>
          <i className="fad fa-plus mr-2" />
          Add Organisation
        </Button>
      </div>
      <Dialog isOpen={addOrganisation} onDismiss={handleAddOrganisationToggle}>
        <DialogTitle title="New organisation" onClose={handleAddOrganisationToggle} />
        <OrganisationEdit onClose={handleAddOrganisationToggle} />
      </Dialog>
    </MainFull>
  );
}
