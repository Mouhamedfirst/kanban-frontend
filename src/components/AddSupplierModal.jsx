import { useState, useCallback } from "react";
import { toast } from "sonner";

export default function AddSupplierModal({ onClose, onAddSupplier }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [takesBackReturns, setTakesBackReturns] = useState(false);
  const [address, setAddress] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file?.type.startsWith("image/")) {
        setLogoFile(file);
      } else {
        toast.warning("Veuillez déposer une image valide.");
      }
    },
    []
  );

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file?.type.startsWith("image/")) {
      setLogoFile(file);
    } else {
      toast.warning("Veuillez sélectionner une image valide.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !address) {
      toast.warning("Tous les champs sont obligatoires.");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("takes_back_returns", takesBackReturns ? 1 : 0);
    formData.append("address", address);
    if (logoFile) formData.append("logo", logoFile);

    onAddSupplier(formData)
      .then(() => {
        toast.success("Fournisseur ajouté !");
        onClose();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Erreur lors de l'ajout du fournisseur.");
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 space-y-4"
      >
        <h2 className="text-xl font-bold">Ajouter un fournisseur</h2>

        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          placeholder="Téléphone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          placeholder="Adresse"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={3}
          required
        />

        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={takesBackReturns}
            onChange={(e) => setTakesBackReturns(e.target.checked)}
          />
          <span>Accepte les retours</span>
        </label>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded p-4 text-center cursor-pointer transition ${
            dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <p className="text-sm text-gray-600">
            Glissez une image ici ou{" "}
            <label htmlFor="logo-upload" className="text-blue-600 underline cursor-pointer">
              choisissez-en une
            </label>
          </p>
          <input
            id="logo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {logoFile && <p className="mt-2 text-sm">{logoFile.name}</p>}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}
