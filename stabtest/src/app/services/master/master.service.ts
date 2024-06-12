import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/app/environtment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private HttpClient: HttpClient,) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  // Parameter
  getParameter() {
    return this.HttpClient.get(environment.apiUrl + `/parameters`)
  }
  showParameter(id: any) {
    return this.HttpClient.get(environment.apiUrl + `/parameters/${id}`)
  }
  updateParameter(id: any, data: any) {
    return this.HttpClient.put(environment.apiUrl + `/parameters/${id}`, data)
  }
  deleteParameter(id: any) {
    return this.HttpClient.delete(environment.apiUrl + `/parameters/${id}`)
  }

  // Timeline
  getTimeline() {
    return this.HttpClient.get(environment.apiUrl + `/timelines`)
  }

  // Schedule
  getSchedule() {
    return this.HttpClient.get(environment.apiUrl + `/schedules`)
  }
  getScheduleByProductAndTemp(product: any, temp: any) {
    return this.HttpClient.get(environment.apiUrl + `/schedules/byProduct/${product}/tempId/${temp}`)
  }
  getByProduct(product: any) {
    return this.HttpClient.get(environment.apiUrl + `/schedules/byProduct/${product}`)
  }
  getPatternTimeline() {
    return this.HttpClient.get(environment.apiUrl + `/schedules/timeline`)
  }

  // Product
  getProduct() {
    return this.HttpClient.get(environment.apiUrl + `/products`)
  }
  showProduct(id: any) {
    return this.HttpClient.get(environment.apiUrl + `/products/${id}`)
  }
  updateProduct(id: any, data: any) {
    return this.HttpClient.put(environment.apiUrl + `/products/${id}`, data)
  }
  deleteProduct(id: any) {
    return this.HttpClient.delete(environment.apiUrl + `/products/${id}`)
  }
  createProduct(data: any) {
    return this.HttpClient.post(environment.apiUrl + `/products`, data)
  }
  showProductBySlug(slug: any) {
    return this.HttpClient.get(environment.apiUrl + `/products/slug/${slug}`)
  }

  // Product Description
  getProductDescription() {
    return this.HttpClient.get(environment.apiUrl + `/product-descriptions`)
  }
  showProductDescription(id: any) {
    return this.HttpClient.get(environment.apiUrl + `/product-descriptions/${id}`)
  }
  updateProductDescription(id: any, data: any) {
    return this.HttpClient.put(environment.apiUrl + `/product-descriptions/${id}`, data)
  }
  deleteProductDescription(id: any) {
    return this.HttpClient.delete(environment.apiUrl + `/product-descriptions/${id}`)
  }
  createProductDescription(data: any) {
    return this.HttpClient.post(environment.apiUrl + `/product-descriptions`, data)
  }
  getProductDescriptionByProduct(product: any) {
    return this.HttpClient.get(environment.apiUrl + `/product-descriptions/product/${product}`)
  }

  // Standard Parameter
  getStandardParameter() {
    return this.HttpClient.get(environment.apiUrl + `/std-prods`)
  }
  showStandardParameter(id: any) {
    return this.HttpClient.get(environment.apiUrl + `/std-prods/${id}`)
  }
  getStandardParameterByProduct(product: any) {
    return this.HttpClient.get(environment.apiUrl + `/std-prods/prodDesc/${product}`)
  }
  updateStandardParameter(id: any, data: any) {
    return this.HttpClient.put(environment.apiUrl + `/std-prods/${id}`, data)
  }
  createParameter(data: any) {
    return this.HttpClient.post(environment.apiUrl + `/parameters`, data)
  }
  deleteStandardParameter(id: any) {
    return this.HttpClient.delete(environment.apiUrl + `/std-prods/${id}`)
  }

  // Line
  getLine() {
    return this.HttpClient.get(environment.apiUrl + `/lines`)
  }
  createLine(data: any) {
    return this.HttpClient.post(environment.apiUrl + `/lines`, data)
  }
  showLine(id: any) {
    return this.HttpClient.get(environment.apiUrl + `/lines/${id}`)
  }
  updateLine(id: any, data: any) {
    return this.HttpClient.put(environment.apiUrl + `/lines/${id}`, data)
  }
  deleteLine(id: any) {
    return this.HttpClient.delete(environment.apiUrl + `/lines/${id}`)
  }

  // Variant
  getVariant() {
    return this.HttpClient.get(environment.apiUrl + `/variants`)
  }
  showVariant(id: any) {
    return this.HttpClient.get(environment.apiUrl + `/variants/${id}`)
  }
  updateVariant(id: any, data: any) {
    return this.HttpClient.put(environment.apiUrl + `/variants/${id}`, data)
  }
  deleteVariant(id: any) {
    return this.HttpClient.delete(environment.apiUrl + `/variants/${id}`)
  }
  createVariant(data: any) {
    return this.HttpClient.post(environment.apiUrl + `/variants`, data)
  }

  // Event
  getEvent() {
    return this.HttpClient.get(environment.apiUrl + `/events`)
  }
  showEvent(id: any) {
    return this.HttpClient.get(environment.apiUrl + `/events/${id}`)
  }
  weeklyEvents() {
    return this.HttpClient.get(environment.apiUrl + `/events/weeklyEvents`)
  }
  findNextCheckingEvent(id: any) {
    return this.HttpClient.get(environment.apiUrl + `/events/nextChecking/${id}`)
  }
  monitoringEvent() {
    return this.HttpClient.get(environment.apiUrl + `/events/monitoring`)
  }

  // Data Stability
  getDataStability() {
    return this.HttpClient.get(environment.apiUrl + `/data-stability`)
  }
  showDataStability(id: any) {
    return this.HttpClient.get(environment.apiUrl + `/data-stability/${id}`)
  }
  createDataStability(data: any) {
    return this.HttpClient.post(environment.apiUrl + `/data-stability`, data)
  }
  getDataStabilityByProduct(product: any) {
    return this.HttpClient.get(environment.apiUrl + `/data-stability/product/${product}`)
  }
  deleteDataStability(id: any) {
    return this.HttpClient.delete(environment.apiUrl + `/data-stability/${id}`)
  }
  countBySection() {
    return this.HttpClient.get(environment.apiUrl + `/data-stability/countBySection`)
  }
  countByStatus() {
    return this.HttpClient.get(environment.apiUrl + `/data-stability/countByStatus`)
  }
  countByYear() {
    return this.HttpClient.get(environment.apiUrl + `/data-stability/countByYear`)
  }
  updateDataStability(id: any, data: any) {
    return this.HttpClient.put(environment.apiUrl + `/data-stability/${id}`, data)
  }
  getDataStabilityByLotNumber(lotNumber: any, slug: any) {
    return this.HttpClient.get(environment.apiUrl + `/data-stability/lotNumber/${lotNumber}/slug/${slug}`)
  }
  updateDataTransactionStability(id: any, data: any) {
    return this.HttpClient.put(environment.apiUrl + `/transactions/dataStability/${id}`, data)
  }

  // Sections
  getSection() {
    return this.HttpClient.get(environment.apiUrl + `/sections`)
  }

  // Email User
  getEmailUser() {
    return this.HttpClient.get(environment.apiUrl + `/email-users`)
  }
  showEmailUser(id: any) {
    return this.HttpClient.get(environment.apiUrl + `/email-users/${id}`)
  }
  deleteEmailUser(id: any) {
    return this.HttpClient.delete(environment.apiUrl + `/email-users/${id}`)
  }
  createEmailUser(data: any) {
    return this.HttpClient.post(environment.apiUrl + `/email-users`, data)
  }
  updateEmailUser(data: any, id: any) {
    return this.HttpClient.put(environment.apiUrl + `/email-users/${id}`, data)
  }

  // Transaction
  getTransaction() {

  }
  createTransaction(data: any) {
    return this.HttpClient.post(environment.apiUrl + `/transactions`, data)
  }
  getTransactionByDataStability(dataStability: any) {
    return this.HttpClient.get(environment.apiUrl + `/transactions/dataStability/${dataStability}`)
  }
  getTransactionsDetailsByTransaction(transaction: any) {
    return this.HttpClient.get(environment.apiUrl + `/transactions/transactions-details/${transaction}`)
  }
  deleteTransaction(id: any) {
    return this.HttpClient.delete(environment.apiUrl + `/transactions/deleteTransaction/${id}`)
  }
  showTransaction(id: any) {
    return this.HttpClient.get(environment.apiUrl + `/transactions/showTransaction/${id}`)
  }
  showTransactionDetails(id: any) {
    return this.HttpClient.get(environment.apiUrl + `/transactions/showTransaction-details/${id}`)
  }
  getTransactionByDataStabilityPerParameter(dataStabilityId: any, parameterId: any) {
    return this.HttpClient.get(environment.apiUrl + `/transactions/transactions-details/data-stability/${dataStabilityId}/parameter/${parameterId}`)
  }
  updateTransactionDetails(id: any, data: any) {
    return this.HttpClient.put(environment.apiUrl + `/transactions/update-transaction-details/${id}`, data)
  }

  // ASLT
  calculateData(data: any) {
    return this.HttpClient.post(environment.apiUrl + `/predictions/calculate`, data);
  }

  // Log Calculation
  getLogCalculation(id: any) {
    return this.HttpClient.get(environment.apiUrl + `/log-calculations/${id}`)
  }
  showLogCalculation(parameterId: any, dataStabilityId: any) {
    return this.HttpClient.get(environment.apiUrl + `/log-calculations/parameter/${parameterId}/dataStability/${dataStabilityId}`)
  }
  createLogCalculation(data: any) {
    return this.HttpClient.post(environment.apiUrl + `/log-calculations`, data)
  }

}
