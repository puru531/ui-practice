import { connect } from "react-redux";
function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

function mapStateToProperties(state) {
  return { balance: state.account.balance };
}

//Legacy way of connecting Components to Redux
export default connect(mapStateToProperties)(BalanceDisplay);
