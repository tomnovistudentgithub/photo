import './GridPage.css';

function GridPage() {
  return (


    <div>

        <div className="grid-container">
            <div>
                <h3>Grid 1</h3>
                <p>Some text</p>
            </div>

            <div className="nested-grid-items">
                <div>
                    <h3>Grid nested 1</h3>
                    <p>Some text</p>
                </div>

                <div>
                    <h3>Grid nested 2</h3>
                    <p>Some text</p>
                </div>
                <div>
                    <h3>Grid nested 3</h3>
                    <p>Some text</p>
                </div>
            </div>


            <div>
                <h3>Grid 2</h3>
                <p>Some text</p>
            </div>
            <div>
            <h3>Grid 3</h3>
            <p>Some text</p>
        </div>
        <div>
            <h3>Grid 4</h3>
            <p>Some text</p>
        </div>


    </div>


    </div>
  );
}

export default GridPage;