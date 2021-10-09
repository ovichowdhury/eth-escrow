import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Deposit from "../components/Deposit";
import Withdraw from '../components/Withdraw';


function Index() {

  return (
    <>
      <Layout>
        <div>
          <div className="d-flex justify-content-center">
            <h1 className="text-muted">Depositor Portal</h1>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <Deposit />
            </div>
            <div className="col-sm-6" style={{marginTop: "40px"}}>
              <Withdraw />
            </div>
          </div>

        </div>
      </Layout>
    </>
  )
}

export default Index;
