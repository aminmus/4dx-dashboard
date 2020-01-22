import React from 'react';
import Wig from '../components/Wig.js';
import Lead from '../components/Lead';
import Details from '../components/Details';
import Monitor from '../components/Monitor';

export default function Home() {
    return (
        <div className="px-5">
            <div className="row">
                <div class="col-sm">
                    <Wig />
                    <Lead />
                </div>
                <div class="col-sm">
                    <Details />
                    <Monitor />
                </div>
            </div>
        </div>
    )
}
