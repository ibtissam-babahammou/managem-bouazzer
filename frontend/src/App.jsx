// ============================================================
// App.jsx — Structure générale + navigation entre les pages
// ============================================================

import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Accueil from "./pages/Accueil";
import Boutique from "./pages/Boutique";
import ProductDetail from "./pages/ProductDetail";
import Panier from "./pages/Panier";
import CheckoutAddress from "./pages/CheckoutAddress";
import CheckoutPayment from "./pages/CheckoutPayment";
import OrderConfirmation from "./pages/OrderConfirmation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VisitDateTime from "./pages/VisitDateTime";
import VisitDetails from "./pages/VisitDetails";
import VisitConfirmation from "./pages/VisitConfirmation";
import Contact from "./pages/Contact";
import APropos from "./pages/APropos";
import MonCompte from "./pages/MonCompte";
import MesCommandes from "./pages/MesCommandes";
import MesAdresses from "./pages/MesAdresses";
import ConnexionSecurite from "./pages/ConnexionSecurite";
import Connaissances from "./pages/Connaissances";
import PolitiqueVieVivee from "./pages/PolitiqueVieVivee";

function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/produit/:id" element={<ProductDetail />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/commande/adresse" element={<CheckoutAddress />} />
          <Route path="/commande/paiement" element={<CheckoutPayment />} />
          <Route path="/commande/confirmation/:id" element={<OrderConfirmation />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
          <Route path="/rendez-vous" element={<VisitDateTime />} />
          <Route path="/rendez-vous/details" element={<VisitDetails />} />
          <Route path="/rendez-vous/confirmation/:id" element={<VisitConfirmation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/mon-compte" element={<MonCompte />} />
          <Route path="/mon-compte/commandes" element={<MesCommandes />} />
          <Route path="/mon-compte/adresses" element={<MesAdresses />} />
          <Route path="/mon-compte/securite" element={<ConnexionSecurite />} />
          <Route path="/mon-compte/connaissances" element={<Connaissances />} />
          <Route path="/politique-vie-privee" element={<PolitiqueVieVivee />} />

          {/* ============================================================
              Les autres pages seront ajoutées ici, une par une,
              au fur et à mesure qu'elles sont construites et vérifiées.
              ============================================================ */}
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
