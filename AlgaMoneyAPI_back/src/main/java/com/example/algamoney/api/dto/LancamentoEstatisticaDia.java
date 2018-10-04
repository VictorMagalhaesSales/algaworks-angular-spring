package com.example.algamoney.api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.example.algamoney.api.model.TipoLancamento;

public class LancamentoEstatisticaDia {

	private TipoLancamento tipoLancamento;
	
	private LocalDate dia;
	
	private BigDecimal total;

	public LancamentoEstatisticaDia(TipoLancamento tipoLancamento, LocalDate dia, BigDecimal total) {
		super();
		this.tipoLancamento = tipoLancamento;
		this.dia = dia;
		this.total = total;
	}

	public TipoLancamento getTipoLancamento() {
		return tipoLancamento;
	}

	public void setTipoLancamento(TipoLancamento tipoLancamento) {
		this.tipoLancamento = tipoLancamento;
	}

	public LocalDate getDia() {
		return dia;
	}

	public void setDia(LocalDate dia) {
		this.dia = dia;
	}

	public BigDecimal getTotal() {
		return total;
	}

	public void setTotal(BigDecimal total) {
		this.total = total;
	}
	
	
	
}
