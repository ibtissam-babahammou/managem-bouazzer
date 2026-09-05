// ============================================================
// components/CheckoutBreadcrumb.jsx
// Utilisé dans les 3 étapes de la commande (Panier, Adresse,
// Paiement) pour montrer où on en est. Un seul fichier, utilisé
// partout — si on change son apparence, on le change une fois.
// ============================================================

export default function CheckoutBreadcrumb({ step }) {
  const steps = ["Commande", "Adresse", "Paiement"];

  return (
    <div className="checkout-breadcrumb">
      {steps.map((label, index) => (
        <span
          key={label}
          className={index === step ? "active" : ""}
        >
          {label}
          {index < steps.length - 1 && " › "}
        </span>
      ))}
    </div>
  );
}
