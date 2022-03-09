import { connect } from 'react-redux';
import RewardsComponent from './RewardsComponent';
import { fetchCustomers } from './Actions';

const mapStateToProps = state => {
    return {
      customers: state.customers,
      loading: state.loading
    };
  };

  const mapDispatchToProps = {
    fetchCustomers: fetchCustomers,
  };

export const RewardsContainer = connect(mapStateToProps,mapDispatchToProps)(RewardsComponent);
