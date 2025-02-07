import {Organization} from "src/model/Organization.js";

export class OrganizationService {
  #URL = `${process.env.API_SPRING_BASE_PATH}/functions`;

  #tokenSpring = localStorage.getItem('authToken');

  async getAll() {
    const data = await fetch(this.#URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + this.#tokenSpring
      }
    })
    const organizations = await data.json()
    return organizations.map(organization => {
      return new Organization(organization.id, organization.name, organization.documentationUrl, organization.contactNumber);
    })
  }

  create(organization) {
    fetch(this.#URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.#tokenSpring
      },
      body: JSON.stringify(organization)
    });
  }

  update(organization) {
    fetch(this.#URL + "/" + organization.id, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.#tokenSpring
      },
      body: JSON.stringify(organization)
    });
  }

  delete(id) {
    fetch(this.#URL + "/" + id, {
      headers: {
        'Authorization': 'Bearer ' + this.#tokenSpring
      },
      method: "DELETE",
    });
  }
}
