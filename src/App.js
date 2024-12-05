import React, { useState } from 'react';
import './App.css';

const App = () => {
  // Estado inicial del inventario
  const [productos, setProductos] = useState([
    { codigo: '1', nombre: 'VACUNA ANTIRRABICA', stock: 15, ubicacion: 'V1001' },
    { codigo: '2', nombre: 'ALIMENTO PERRO ADULTO', stock: 50, ubicacion: 'V2002' },
    { codigo: '3', nombre: 'ANTIPULGAS GATOS', stock: 30, ubicacion: 'V3003' },
    { codigo: '4', nombre: 'JABON MEDICADO', stock: 40, ubicacion: 'V4004' },
    { codigo: '5', nombre: 'ALIMENTO GATO CACHORRO', stock: 25, ubicacion: 'V5005' },
    { codigo: '6', nombre: 'VITAMINAS PERROS', stock: 60, ubicacion: 'V6006' }
  ]);

  // Función para aumentar el stock
  const aumentarStock = (codigo) => {
    setProductos(
      productos.map((producto) =>
        producto.codigo === codigo ? { ...producto, stock: producto.stock + 1 } : producto
      )
    );
  };

  // Función para disminuir el stock
  const disminuirStock = (codigo) => {
    setProductos(
      productos.map((producto) =>
        producto.codigo === codigo && producto.stock > 0
          ? { ...producto, stock: producto.stock - 1 }
          : producto
      )
    );
  };

  // Función para eliminar un producto
  const eliminarProducto = (codigo) => {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmacion) {
      setProductos(productos.filter((producto) => producto.codigo !== codigo));
    }
  };

  // Función para agregar un nuevo producto
  const agregarProducto = (e) => {
    e.preventDefault();
    const { codigo, nombre, stock, ubicacion } = e.target.elements;

    // Validación de existencia del producto
    const productoExistente = productos.some((producto) => producto.codigo === codigo.value);
    if (productoExistente) {
      alert('El producto con ese código ya existe');
      return;
    }

    setProductos([
      ...productos,
      {
        codigo: codigo.value,
        nombre: nombre.value,
        stock: parseInt(stock.value),
        ubicacion: ubicacion.value
      }
    ]);
  };

  return (
    <div className="container">
      <h1>Gestión de Inventario de Veterinaria</h1>

      {/* Formulario para agregar un producto */}
      <form onSubmit={agregarProducto}>
        <input name="codigo" placeholder="Código" required />
        <input name="nombre" placeholder="Nombre" required />
        <input name="stock" type="number" placeholder="Stock" required />
        <input name="ubicacion" placeholder="Ubicación" required />
        <button type="submit">Agregar Producto</button>
      </form>

      {/* Tabla de productos */}
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Stock</th>
            <th>Ubicación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.codigo}>
              <td>{producto.codigo}</td>
              <td>{producto.nombre}</td>
              <td>
                <button className="aumentar" onClick={() => aumentarStock(producto.codigo)}>+</button>
                {producto.stock}
                <button className="disminuir" onClick={() => disminuirStock(producto.codigo)}>-</button>
              </td>
              <td>{producto.ubicacion}</td>
              <td>
                <button className="eliminar" onClick={() => eliminarProducto(producto.codigo)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
