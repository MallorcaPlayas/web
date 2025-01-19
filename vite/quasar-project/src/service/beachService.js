export default {
  async getAll() {
    // Aquí iría una llamada a la API para obtener las playas
    return [{ id: 1, nombre: 'Playa del Sol' }, { id: 2, nombre: 'Playa Verde' }];
  },
  async create(beach) {
    console.log('Creando playa:', beach);
  },
  async update(beach) {
    console.log('Actualizando playa:', beach);
  },
  async delete(id) {
    console.log('Eliminando playa con ID:', id);
  },
};
