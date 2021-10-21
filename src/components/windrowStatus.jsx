import React from "react";

function WindrowStatus(props) {
  const status = props.status;
  const turn = props.turn
  return (
    <div>
      <figure class="figure">
        {status == 1 ? (
          <div>
            <img
              src="/img/fresh.png"
              class="img-fluid"
              alt="Responsive image"
            ></img>
            <figcaption class="figure-caption text-center">
              <button type="button" class="btn btn-secondary">
                Status: Fresh
              </button>
            </figcaption>
          </div>
        ) : status == 2 ? (
          <div>
            <img
              src="/img/meso.png"
              class="img-fluid"
              alt="Responsive image"
            ></img>
            <figcaption class="figure-caption text-center">
              <button type="button" class="btn btn-secondary">
                Status: Mesophilic
              </button>
            </figcaption>
          </div>
        ) : status == 3 ? (
          <div>
            <img
              src="/img/thermo.png"
              class="img-fluid"
              alt="Responsive image"
            ></img>
            <figcaption class="figure-caption text-center">
              <button type="button" class="btn btn-secondary">
                Status: Thermophilic
              </button>
            </figcaption>
          </div>
        ) : status == 4 ? (
          <div>
            <img
              src="/img/mature.png"
              class="img-fluid"
              alt="Responsive image"
            ></img>
            <figcaption class="figure-caption text-center">
              <button type="button" class="btn btn-secondary">
                Status: Maturation
              </button>
            </figcaption>
          </div>
        ) : (
          <div>
            <img
              src="/img/completed.png"
              class="img-fluid"
              alt="Responsive image"
            ></img>
            <figcaption class="figure-caption text-center">
              <button type="button" class="btn btn-secondary">
                Status: Stable
              </button>
            </figcaption>
          </div>
        )}
      </figure>
      <div class="media" style={{paddingLeft:"178px"}}>
        <img src="/img/compost.png" class="mr-3" alt="..."></img>
        <div class="media-body">
          <h5 class="mt-3">Turn: {turn}</h5>
        </div>
      </div>
    </div>
  );
}

export default WindrowStatus;
