import React, {FC, Fragment} from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = {
    children: React.ReactNode
};

function Layouts({children}:Props): React.ReactElement {
    return (
        <Fragment>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </Fragment>
    );
}

export default Layouts;