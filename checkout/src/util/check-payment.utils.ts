import axios from 'axios';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';

export async function checkPaymentStatus(
  createOrderDto: CreateOrderDto,
): Promise<boolean> {
  try {
    const res = await axios.get('http://localhost:3001/pay');
    if (res.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error checking payment status:', error);
    return false;
  }
}
